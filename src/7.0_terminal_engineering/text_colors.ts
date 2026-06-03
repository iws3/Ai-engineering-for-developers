// the escape character (\x1b) opens the command , a left bracket introduce the parameter list.. the parameter tell the terminal what to do, AND TE FINAL LTTER IDENTIFIES THE TYPE OF COMMAD. eg \x1b[2J clears the entire screen.  \x1b is the escape. [ opens the sequence, 2 is the parameter (meaning 'entire screen') and j is the commnad letter ('meaning erase display')

// 2.2 Text Colors

// Colors are the most commonly used escape codes and the first ones you should master. The m
// command (Select Graphic Rendition) controls all styling. The basic 16-color palette uses codes 30–37
// for foreground and 40–47 for background, with code 0 resetting everything back to the default:

// the escape character that start every ANSI sequence

const ESC = "\x1b";
// helper to build color sequence. the "m" at the end menas . select the "Graphic Rendition" it applies text styling.
const ansi=(code:number | string)=>`${ESC}[${code}m`;
// reset all styling back to the terminal default
const RESET=ansi(0);
// foreground colors
const colors={
    black:ansi(30),
    red:ansi(31),
    green:ansi(32),
    yellow:ansi(33),
    blue:ansi(34),
    magenta:ansi(35),
    cyan:ansi(36),
    white:ansi(37)
}

// Text styles: bold, dim, italic, underline.
const style = {
  bold: ansi(1),
  dim: ansi(2),
  italic: ansi(3),
  underline: ansi(4),
  blink: ansi(5),
  inverse: ansi(7), // Swaps foreground and background.
  hidden: ansi(8),
  strikethrough: ansi(9),
};


console.log("hello there")

console.log(RESET)

// 2.3 256-Color and True Color (RGB)
// The basic 16-color palette is fine for simple programs, but modern terminals support 256 colors and
// even 24-bit RGB color (called 'true color'). These use extended SGR sequences with additional
// parameters:



const color256 = (n: number) => `${ESC}[38;5;${n}m`;
const bg256 = (n: number) => `${ESC}[48;5;${n}m`;


// Usage: always reset after coloring text.
process.stdout.write(
 `${colors.red}${style.underline}Success!${RESET} Operation complete.\n`
);


