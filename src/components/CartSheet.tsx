import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CartSheet = () => {
  const { items, total, setQuantity, removeItem, clear, isOpen, setIsOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const checkout = async () => {
    if (!user) {
      setIsOpen(false);
      navigate("/auth");
      return;
    }
    setPlacing(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total, status: "pending" })
      .select("id")
      .single();

    if (error || !order) {
      setPlacing(false);
      toast.error("We couldn't place your order. Please try again.");
      return;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        product_name: i.name,
        unit_price: i.price,
        quantity: i.quantity,
      }))
    );
    setPlacing(false);

    if (itemsError) {
      toast.error("We couldn't save your items. Please try again.");
      return;
    }

    clear();
    setIsOpen(false);
    toast.success("Order placed — thank you!");
    navigate("/account");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-light">Your bag</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <p className="mt-8 font-body text-sm text-muted-foreground">
            Your bag is empty.
          </p>
        ) : (
          <>
            <div className="mt-6 flex-1 space-y-5 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base text-foreground">{item.name}</p>
                    <p className="font-body text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center border border-border text-foreground"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center font-body text-sm">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center border border-border text-foreground"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-2xl text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={checkout}
                disabled={placing}
                className="mt-5 h-12 w-full rounded-none bg-foreground font-body text-xs uppercase tracking-[0.25em] text-background hover:bg-primary hover:text-primary-foreground"
              >
                {placing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? "Place order" : "Sign in to order"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
