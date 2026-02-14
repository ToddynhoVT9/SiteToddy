export default function Text({ children, variant = "normal" }) {
  const styles = {
    normal: "text-white",
    muted: "text-zinc-400",
    danger: "text-red-500",
  };

  return <p className={styles[variant]}>{children}</p>;
}
