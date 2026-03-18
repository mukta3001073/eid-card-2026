import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface ReactionCount {
  [wishId: string]: { "❤️": number; "🤲": number };
}

const EidWishWall = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sending, setSending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    fetchWishes();

    const channel = supabase
      .channel("eid-wishes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "eid_wishes" },
        (payload) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "eid_wishes" },
        (payload) => {
          setWishes((prev) => prev.filter((w) => w.id !== (payload.old as { id: string }).id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("eid_wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setWishes(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) return;
    if (trimmedName.length > 100 || trimmedMessage.length > 500) {
      toast({ title: "Message too long", variant: "destructive" });
      return;
    }

    setSending(true);
    const { error } = await supabase
      .from("eid_wishes")
      .insert({ name: trimmedName, message: trimmedMessage });

    if (error) {
      toast({ title: "Failed to send wish", variant: "destructive" });
    } else {
      setName("");
      setMessage("");
      toast({ title: "Wish sent! 🌙" });
    }
    setSending(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase
      .from("eid_wishes")
      .delete()
      .eq("id", deleteTarget);

    if (error) {
      toast({ title: "Failed to delete wish", variant: "destructive" });
    } else {
      toast({ title: "Wish deleted 🗑️" });
    }
    setDeleteTarget(null);
  };

  return (
    <section className="relative py-16 px-4" style={{ zIndex: 15 }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-primary glow-gold text-center mb-8"
        >
          Eid Wish Wall 🌙
        </motion.h2>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="rounded-xl p-6 mb-10 glass-overlay"
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full mb-3 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            placeholder="Write your Eid wish..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <motion.button
            type="submit"
            disabled={sending || !name.trim() || !message.trim()}
            className="w-full py-3 rounded-lg font-body font-semibold text-sm bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              boxShadow: "0 0 20px hsl(var(--gold) / 0.3)",
            }}
          >
            <Send className="w-4 h-4" />
            {sending ? "Sending..." : "Send Wish"}
          </motion.button>
        </motion.form>

        {/* Wishes Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {wishes.map((wish, i) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ delay: i < 10 ? i * 0.05 : 0 }}
                className="rounded-xl p-5 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                  boxShadow: "0 0 15px hsl(var(--primary) / 0.08)",
                }}
              >
                <div className="absolute inset-0 geometric-pattern opacity-30" />

                {/* Delete button */}
                <button
                  onClick={() => setDeleteTarget(wish.id)}
                  className="absolute top-3 right-3 z-20 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 bg-destructive/10 hover:bg-destructive/90 text-muted-foreground hover:text-destructive-foreground"
                  aria-label="Delete wish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="relative z-10">
                  <p className="font-body text-foreground text-sm mb-3 leading-relaxed pr-8">
                    "{wish.message}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-primary text-xs font-semibold flex items-center gap-1">
                      🌙 {wish.name}
                    </span>
                    <span className="font-body text-muted-foreground text-xs">
                      {new Date(wish.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {wishes.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-sm py-8">
              Be the first to send an Eid wish! ✨
            </p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete this wish?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete this wish? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default EidWishWall;
