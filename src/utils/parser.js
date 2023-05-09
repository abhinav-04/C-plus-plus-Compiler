/*------Syntax Analyzer--------*/

function tokenize(lexemes) {
  const dataTypes = ["int", "double", "char", "float", "bool"];
  const tokens = [];

  for (const lexeme of lexemes) {
    if (dataTypes.includes(lexeme)) {
      tokens.push("<keyword>");
    } else if (lexeme.includes("=")) {
      tokens.push("<assignment_operator>");
      const parts = lexeme.split("=");
      if (parts[0].length > 20) {
       alert(`Lexical error: Identifier "${parts[0]}" exceeds 20 characters.`);
      } else if (isNaN(parts[1]) && parts[1].length > 20) {
        alert(`Lexical error: Value "${parts[1]}" exceeds 20 characters.`);
      }
    } else if (
      lexeme.includes('"') ||
      lexeme.includes("'") ||
      !isNaN(lexeme.charAt(0)) ||
      lexeme.includes(".") ||
      lexeme === "true" ||
      lexeme === "false"
    ) {
      tokens.push("<value>");
      if (isNaN(lexeme) && lexeme.length > 20) {
        alert(`Lexical error: Value "${lexeme}" exceeds 20 characters.`);
      }
    } else if (lexeme.includes(";")) {
      tokens.push("<delimiter>");
    } else {
      tokens.push("<identifier>");
      if (lexeme.length > 20) {
        alert(`Lexical error: Identifier "${lexeme}" exceeds 20 characters.`);
      }
      if (lexeme.match(/^[0-9]/)) {
       alert(`Lexical error: Identifier "${lexeme}" starts with a number.`);
      }
      if (lexeme.match(/[^\w\d]/)) {
        alert(`Lexical error: Identifier "${lexeme}" contains non-alphanumeric characters.`);
      }
    }
  }
  return tokens;
}

