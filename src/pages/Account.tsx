import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type OrderRow = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  order_items: { id: string; product_name: string; quantity: number; unit_price: number }[];
};

const Account = () => {
  const { user, loading, signOut, displayName } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    setName(displayName ?? "");
  }, [displayName]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("id, status, total, created_at, order_items(id, product_name, quantity, unit_price)")
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data as OrderRow[]) ?? []));
  }, [user]);

  const saveName = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: name })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error("Could not save your name.");
    else toast.success("Name saved.");
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <h1 className="font-display text-4xl font-light text-foreground">Your account</h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">{user.email}</p>

        <div className="mt-10 space-y-3">
          <Label htmlFor="name">Display name</Label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button
              onClick={saveName}
              disabled={saving}
              className="rounded-none bg-foreground font-body text-xs uppercase tracking-[0.2em] text-background hover:bg-primary hover:text-primary-foreground"
            >
              Save
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-light text-foreground">Your orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4 font-body text-sm text-muted-foreground">
              No orders yet. Your first ritual awaits.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()} · {order.status}
                    </p>
                    <p className="font-display text-lg text-foreground">
                      ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {order.order_items?.map((item) => (
                      <li key={item.id} className="font-body text-sm text-muted-foreground">
                        {item.quantity} × {item.product_name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
          className="mt-14 rounded-none font-body text-xs uppercase tracking-[0.2em]"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Account;
