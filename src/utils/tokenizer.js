/*------Lexical Analyzer--------*/


function throwError(message) {
  throw new Error(`Lexical error: ${message}`);
}

function tokenize(lexemes) {
  const dataTypes = ["int", "double", "char", "float", "bool"];
  const tokens = [];

  for (const lexeme of lexemes) {
    if (dataTypes.includes(lexeme)) {
      tokens.push("<keyword>");
    } else if (lexeme.includes("=")) {
      tokens.push("<assignment_operator>");
    } else if (
      lexeme.includes('"') ||
      lexeme.includes("'") ||
      !isNaN(lexeme.charAt(0)) ||
      lexeme.includes(".") ||
      lexeme === "true" ||
      lexeme === "false"
    ) {
      if (lexeme.length > 10) {
        console.error(`Exceeded length of numeric constant or identifier: ${lexeme}`);
      }
      tokens.push("<value>");
    } else if (lexeme.includes(";")) {
      tokens.push("<delimiter>");
    } else {
      if (/^[a-zA-Z_]+[a-zA-Z0-9_]*$/.test(lexeme)) {
        if (lexeme.length > 15) {
          console.error(`Exceeded length of identifier: ${lexeme}`);
        }
        tokens.push("<identifier>");
      } else {
        console.error(`Spelling error: ${lexeme}`);
      }
    }
  }
  return tokens;
}

function lex(input, isFile) {
  const individualChars = input.split("");

  const lexemes = [];

  let temp = "",
    quotedString = "";

  let isQuote = false;

  for (const c of individualChars) {
    if (c === "=" && !isQuote) {
      lexemes.push(temp);
      lexemes.push(c);
      temp = "";
    } else if (c === ";" && !isQuote) {
      lexemes.push(temp);
      lexemes.push(c);
      temp = "";
    } else if (c === " " && !isQuote) {
      lexemes.push(temp);
      temp = "";
    } else if (c === '"') {
      quotedString += c;
      if (isQuote) {
        lexemes.push(temp);
        temp = "";
        lexemes.push(quotedString);
        quotedString = "";
        isQuote = false;
      } else {
        isQuote = true;
      }
    } else if (isQuote) {
      quotedString += c;
    } else {
      temp += c;
    }
  }
  lexemes.push(temp);
  if (isFile) lexemes.pop(); // remove /n
  return lexemes.filter((n) => n !== "");
}

export { tokenize, lex };
