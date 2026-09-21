import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Review = {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  name: string;
  product: string | null;
};

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "B";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const StarPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`${i + 1} star${i ? "s" : ""}`}
        onClick={() => onChange(i + 1)}
        className="p-1"
      >
        <Star
          className={`h-6 w-6 ${i < value ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
        />
      </button>
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
    >
      <StarRating rating={review.rating} />
      {review.title && (
        <p className="mt-3 font-sans text-sm font-medium text-foreground">{review.title}</p>
      )}
      <p className="mt-3 font-serif text-base italic leading-relaxed text-foreground/80 sm:text-lg">
        "{review.comment}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarFallback className="bg-primary/10 font-serif text-sm text-primary">
            {initialsOf(review.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">{review.name}</p>
          {review.product && (
            <p className="text-xs text-muted-foreground">{review.product}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState("");
  const [busy, setBusy] = useState(false);

  const loadReviews = useCallback(async () => {
    const [{ data: reviewRows }, { data: productRows }] = await Promise.all([
      supabase
        .from("reviews")
        .select("id, rating, title, comment, user_id, product_id")
        .order("created_at", { ascending: false })
        .limit(12),
      supabase.from("products").select("id, name").eq("is_active", true),
    ]);

    setProducts(productRows ?? []);
    if (!reviewRows) return;

    const userIds = [...new Set(reviewRows.map((r) => r.user_id))];
    const { data: profileRows } = userIds.length
      ? await supabase.from("profiles").select("id, display_name").in("id", userIds)
      : { data: [] as { id: string; display_name: string | null }[] };

    const nameById = new Map((profileRows ?? []).map((p) => [p.id, p.display_name]));
    const productById = new Map((productRows ?? []).map((p) => [p.id, p.name]));

    setReviews(
      reviewRows.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        name: nameById.get(r.user_id) || "Botanica customer",
        product: r.product_id ? productById.get(r.product_id) ?? null : null,
      }))
    );
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      product_id: productId || null,
      rating,
      title: title || null,
      comment,
    });
    setBusy(false);
    if (error) {
      toast.error("We couldn't save your review. Please try again.");
      return;
    }
    setOpen(false);
    setTitle("");
    setComment("");
    setRating(5);
    setProductId("");
    toast.success("Thank you for your review!");
    loadReviews();
  };

  return (
    <section id="testimonials" className="bg-background py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 inline-block font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl font-light text-foreground sm:text-4xl md:text-5xl">
            Loved by Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm text-muted-foreground sm:text-base">
            Real stories from people who discovered their most radiant skin through the
            power of botanicals.
          </p>

          {user ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-8 h-12 rounded-none bg-foreground px-8 font-body text-xs uppercase tracking-[0.2em] text-background hover:bg-primary hover:text-primary-foreground">
                  Write a review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-light">
                    Share your experience
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-5 text-left">
                  <div className="space-y-2">
                    <Label>Your rating</Label>
                    <StarPicker value={rating} onChange={setRating} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-product">Product</Label>
                    <select
                      id="review-product"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="h-11 w-full border border-input bg-background px-3 font-body text-sm text-foreground"
                    >
                      <option value="">General review</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-title">Title</Label>
                    <Input
                      id="review-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Optional headline"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-comment">Your review</Label>
                    <Textarea
                      id="review-comment"
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={busy}
                    className="h-12 w-full rounded-none bg-foreground font-body text-xs uppercase tracking-[0.25em] text-background hover:bg-primary hover:text-primary-foreground"
                  >
                    {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Post review
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="mt-8 h-12 rounded-none px-8 font-body text-xs uppercase tracking-[0.2em]"
            >
              Sign in to write a review
            </Button>
          )}
        </motion.div>

        {reviews.length === 0 ? (
          <p className="text-center font-body text-sm text-muted-foreground">
            No reviews yet — be the first to share your ritual.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
