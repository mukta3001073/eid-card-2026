import { motion } from "framer-motion";

const CrescentMoon = () => {
  return (
    <motion.div
      className="absolute"
      style={{ top: "8%", right: "15%", zIndex: 2 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <div className="relative w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44">
        {/* Moon glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(45, 100%, 80%, 0.3) 0%, transparent 70%)",
            transform: "scale(2.5)",
          }}
        />
        {/* Moon body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(45, 100%, 92%), hsl(45, 80%, 75%))",
            boxShadow: "0 0 40px hsla(45, 100%, 70%, 0.5), 0 0 80px hsla(45, 100%, 60%, 0.3)",
          }}
        />
        {/* Crescent shadow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "80%",
            height: "80%",
            top: "-5%",
            right: "-10%",
            background: "hsl(232, 70%, 11%)",
            boxShadow: "inset 5px 0 15px hsla(232, 70%, 20%, 0.5)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default CrescentMoon;
