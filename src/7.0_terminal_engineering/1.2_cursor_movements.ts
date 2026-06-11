// 2.4 Cursor Movement
// Moving the cursor is what transforms a linear stream of text into a two-dimensional interface. Without
// cursor control you can only add text at the bottom of whatever was printed last. With cursor control you
// can redraw any part of the screen at any time — the foundation of all animation and UI updates.

const ESC="\x1b";
// cursor movements commands:
// tHESE ALL end with a LETTER that identifies the command type:
export const cursor = {
  // Move to absolute position (1-indexed: row=1 is top-left, col=1 is top-left).
  // H="Cursor Position" command.
  moveTo: (row: number, col: number) => `${ESC}[${row};${col}H`,
  // Move up/down/left/right by N cells
  up: (n = 1) => `${ESC}[${n}A`,
  down: (n = 1) => `${ESC}[${n}B`,
  right: (n = 1) => `${ESC}[${n}C`,
  left: (n = 1) => `${ESC}[${n}D`,
  // Move to start of line N lines down/up.
  nextLine: (n = 1) => `${ESC}[${n}E`,
  prevLine: (n = 1) => `${ESC}[${n}F`,
  // Move to a specific column on the current line.
  toColumn: (col: number) => `${ESC}[${col}G`,
  // Save and restore cursor position.
  save: () => `${ESC}[s`,
  restore: () => `${ESC}[u`,
  // Hide and show the cursor (essential for clean UIs).
  hide: () => `${ESC}[?25l`,
  show: () => `${ESC}[?25h`,
};

// Demo: print a counter that updates in place.
process.stdout.write(cursor.hide()); // Hide cursor during animation.
for (let i = 0; i <= 100; i++) {
 process.stdout.write(
    cursor.toColumn(1) + // Always return to column 1 of this line.
 `Processing: ${i}% ` // The trailing spaces overwrite previous text.
 );
 // Simulate work with a blocking delay (not for production).
 Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
}
process.stdout.write("\n" + cursor.show());
