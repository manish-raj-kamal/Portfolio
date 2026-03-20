const { spawn } = require("child_process");

function run(name, command) {
  const child = spawn(command, { stdio: "inherit", shell: true });
  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[dev] ${name} exited with signal ${signal}`);
      return;
    }

    if (code !== 0) {
      console.error(`[dev] ${name} exited with code ${code}`);
      shutdown(code || 1);
    }
  });
  return child;
}

const children = [
  run("backend", "npm --prefix backend run dev"),
  run("frontend", "npm --prefix frontend run dev"),
];

let stopped = false;

function shutdown(exitCode = 0) {
  if (stopped) return;
  stopped = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  }

  setTimeout(() => process.exit(exitCode), 200);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
