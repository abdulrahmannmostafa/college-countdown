import { useState } from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ParticleBackground } from "./components/ParticleBackground";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { motion } from "motion/react";
import cmpLogo from "figma:asset/5284abb73d1e6279c51c9b1562b64d81b0cc3c93.png";

export default function App() {
  // Default graduation date - July 30, 2026
  const [graduationDate, setGraduationDate] = useState<Date>(
    new Date("2026-07-30T10:00:00")
  );
  const [tempDate, setTempDate] = useState<string>("2026-07-30");
  const [open, setOpen] = useState(false);

  const handleDateChange = () => {
    const newDate = new Date(tempDate + "T10:00:00");
    if (!isNaN(newDate.getTime())) {
      setGraduationDate(newDate);
      setOpen(false);
    }
  };

  const isCountdownOver = +graduationDate <= +new Date();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/flagged/photo-1563203157-854702859de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYwNTU2Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Graduation celebration"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 animate-pulse"></div>
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* CMP Logo Watermark */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={cmpLogo}
          alt="CMP 26"
          className="w-[600px] h-auto"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-5xl w-full space-y-12">
          {/* Header */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-cyan-400/50 rounded-full"></div>
                <img
                  src={cmpLogo}
                  alt="CMP 26"
                  className="relative w-28 h-28 md:w-40 md:h-40"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
                style={{
                  textShadow:
                    "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                    "0 0 30px rgba(34, 211, 238, 0.7), 0 0 60px rgba(34, 211, 238, 0.5)",
                    "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                CMP Class 2026
              </motion.h1>

              <motion.p
                className="text-3xl md:text-5xl text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                }}
              >
                ع الأسفلت
              </motion.p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {!isCountdownOver ? (
              <CountdownTimer targetDate={graduationDate} />
            ) : (
              <Card className="p-8 md:p-12 text-center bg-gray-900/80 backdrop-blur-sm shadow-xl border-cyan-500/50">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <div className="w-16 h-16 text-cyan-400">✨</div>
                </motion.div>
                <h2 className="text-3xl md:text-5xl text-white mb-4">
                  🎓 Congratulations! 🎉
                </h2>
                <p className="text-xl text-gray-300">
                  We made it! Here's to new beginnings!
                </p>
              </Card>
            )}
          </motion.div>

          {/* Graduation Date Display and Edit */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="px-6 py-3 bg-gray-900/60 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/60 transition-all">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>
                  Graduation Day:{" "}
                  {graduationDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-800 hover:bg-cyan-900/50 text-white border-cyan-500/50 hover:border-cyan-400 transition-all"
                >
                  Change Date
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-900 text-white border-cyan-500/50">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Set Graduation Date
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Choose the date for your graduation ceremony
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="graduation-date" className="text-white">
                      Graduation Date
                    </Label>
                    <Input
                      id="graduation-date"
                      type="date"
                      value={tempDate}
                      onChange={(e) => setTempDate(e.target.value)}
                      className="bg-gray-800 border-cyan-500/50 text-white focus:border-cyan-400"
                    />
                  </div>
                  <Button
                    onClick={handleDateChange}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/50"
                  >
                    Save Date
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
