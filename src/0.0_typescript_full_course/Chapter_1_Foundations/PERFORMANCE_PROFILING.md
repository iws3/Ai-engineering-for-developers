# TypeScript Performance Profiling

Tools and techniques for profiling TypeScript applications.

---

## Build Time Analysis

### Measure Compilation Speed
\`\`\`bash
# Time the build
time npx tsc --noEmit

# Measure with --diagnostics
npx tsc --diagnostics
\`\`\`

### Identify Slow Files
\`\`\`bash
# Verbose output
npx tsc --listFilesOnly
\`\`\`

---

## Runtime Profiling

### Chrome DevTools
1. Run with inspect: `node --inspect app.js`
2. Open chrome://inspect
3. Profile execution
4. Identify hot paths

### CPU and Memory
- Use `--prof` flag for CPU profiling
- Use `--trace-gc` for garbage collection
- Monitor with: `processmetrics`

---

