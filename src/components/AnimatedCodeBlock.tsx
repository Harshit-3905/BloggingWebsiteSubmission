import { useEffect, useState, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

export function AnimatedCodeBlock() {
  const [scope, animate] = useAnimate();
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasAnimatedOnce = useRef(false);

  // Lines of code to animate
  const codeLines = [
    "function shareCodingKnowledge() {",
    "  const blog = {",
    '    title: "My Coding Journey",',
    '    author: "You",',
    '    audience: "The World"',
    "  };",
    "",
    "  BinaryBlogs.publish(blog);",
    "}",
  ];

  const codeSample = codeLines.join("\n");

  // Animate typing effect - only once
  useEffect(() => {
    // Only run animation if it hasn't run before
    if (hasAnimatedOnce.current) return;

    let cursorInterval: ReturnType<typeof setInterval>;

    if (!isTyping) {
      // Blink cursor after typing is complete
      cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 530);

      // Animation has completed at least once
      hasAnimatedOnce.current = true;

      return () => {
        clearInterval(cursorInterval);
      };
    }

    let currentIndex = 0;
    const typingSpeed = 40; // ms per character
    const randomizeSpeed = () => typingSpeed + Math.random() * 30 - 15;

    const typingInterval = setInterval(() => {
      if (currentIndex <= codeSample.length) {
        setTypedText(codeSample.substring(0, currentIndex));
        currentIndex++;

        // Random pause to make typing seem more human
        if (
          codeSample[currentIndex - 1] === "." ||
          codeSample[currentIndex - 1] === ";" ||
          codeSample[currentIndex - 1] === "\n"
        ) {
          clearInterval(intervalRef.current!);
          intervalRef.current = setInterval(() => {
            if (currentIndex <= codeSample.length) {
              setTypedText(codeSample.substring(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(intervalRef.current!);
              setIsTyping(false);
              hasAnimatedOnce.current = true;
            }
          }, randomizeSpeed()) as unknown as ReturnType<typeof setInterval>;
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        hasAnimatedOnce.current = true;
      }
    }, randomizeSpeed());

    intervalRef.current = typingInterval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTyping, codeSample]);

  // Animate the code block
  useEffect(() => {
    const sequence = async () => {
      // Initial animation
      await animate(
        scope.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.7, ease: "easeOut" }
      );

      // Animate the particles
      const particles = Array.from(document.querySelectorAll(".code-particle"));
      particles.forEach((particle, i) => {
        animate(
          particle,
          {
            opacity: [0, 0.8, 0],
            y: ["100%", "0%", "-20%"],
            x: [`${Math.random() * 30 - 15}%`, `${Math.random() * 40 - 20}%`],
          },
          {
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2,
            ease: "easeOut",
          }
        );
      });

      // Animate function names
      animate(
        ".function-name",
        { color: ["#4ade80", "#22c55e", "#4ade80"] },
        { duration: 2, repeat: Infinity, ease: "easeInOut" }
      );

      // Animate object name
      animate(
        ".object-name",
        {
          textShadow: [
            "0px 0px 0px rgba(139, 92, 246, 0)",
            "0px 0px 10px rgba(139, 92, 246, 0.5)",
            "0px 0px 0px rgba(139, 92, 246, 0)",
          ],
        },
        { duration: 2, repeat: Infinity, ease: "easeInOut" }
      );
    };

    sequence();
  }, [scope, animate]);

  return (
    <motion.div
      ref={scope}
      className="code-block relative font-code border border-white/20 rounded-lg shadow-xl bg-black dark:bg-black text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <div className="flex">
        {/* Line numbers column */}
        <div className="line-numbers py-6 pl-4 pr-2 text-white select-none bg-black/90 border-r border-white/10 font-mono text-xs md:text-sm text-right">
          {Array.from({
            length: isTyping ? typedText.split("\n").length : codeLines.length,
          }).map((_, i) => (
            <div key={i} className="leading-relaxed text-white h-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code content */}
        <div className="p-6 flex-1 overflow-x-auto">
          {isTyping ? (
            <pre className="text-sm md:text-base text-left overflow-x-auto text-white">
              <code>
                {typedText}
                <span
                  className={`${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  } transition-opacity`}
                >
                  |
                </span>
              </code>
            </pre>
          ) : (
            <pre className="text-sm md:text-base text-left overflow-x-auto text-white">
              <code>
                <span className="code-keyword text-blue-400">function</span>{" "}
                <span className="function-name text-green-400">
                  shareCodingKnowledge
                </span>
                () {"{"}
                <br />
                {"  "}
                <span className="code-keyword text-blue-400">const</span> blog ={" "}
                {"{"}
                <br />
                {"    "}title:{" "}
                <span className="code-string text-amber-300">
                  "My Coding Journey"
                </span>
                ,
                <br />
                {"    "}author:{" "}
                <motion.span
                  className="code-string text-amber-300"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  "You"
                </motion.span>
                ,
                <br />
                {"    "}audience:{" "}
                <span className="code-string text-amber-300">"The World"</span>
                <br />
                {"  "}
                {"}"};
                <br />
                <br />
                {"  "}
                <motion.span
                  className="object-name text-purple-400"
                  animate={{
                    textShadow: [
                      "0px 0px 0px rgba(139, 92, 246, 0)",
                      "0px 0px 10px rgba(139, 92, 246, 0.5)",
                      "0px 0px 0px rgba(139, 92, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BinaryBlogs
                </motion.span>
                .
                <motion.span
                  className="function-name text-green-400"
                  animate={{ color: ["#4ade80", "#22c55e", "#4ade80"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  publish
                </motion.span>
                (blog);
                <br />
                {"}"}
              </code>
            </pre>
          )}
        </div>
      </div>

      {/* Editor top bar with buttons */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 rounded-t-lg flex items-center px-3 gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-gray-400 text-xs ml-2 font-sans">script.js</div>
      </div>

      {/* Flying particles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="code-particle absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: "100%",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
