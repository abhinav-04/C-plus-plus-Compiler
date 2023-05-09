/*------Syntax Analyzer--------*/

function parse(tokens) {
  const correctSyntax = [
    [
      "<keyword>",
      "<identifier>",
      "<assignment_operator>",
      "<value>",
      "<delimiter>",
    ],
    ["<keyword>", "<identifier>", "<delimiter>"],
  ];

  if (tokens.length > correctSyntax[0].length) {
    throw new Error("Syntax error: Too many tokens.");
  }

  let stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "{") {
      stack.push("{");
    } else if (token === "}") {
      if (stack.length === 0) {
        throw new Error("Syntax error: Missing opening brace.");
      } else {
        stack.pop();
      }
    } else if (token === "print") {
      const nextToken = tokens[i + 1];
      if (nextToken === "(") {
        let j = i + 2;
        while (j < tokens.length && tokens[j] !== ")") {
          if (tokens[j] === ";" || tokens[j] === "{") {
            throw new Error("Syntax error: Attempting to print variable without declaring it.");
          }
          j++;
        }
        if (j === tokens.length) {
          throw new Error("Syntax error: Missing closing parenthesis.");
        }
      } else {
        throw new Error("Syntax error: Missing opening parenthesis.");
      }
    } else if (token === ";") {
      const prevToken = tokens[i - 1];
      if (prevToken !== ">" && prevToken !== "<" && prevToken !== "=") {
        throw new Error("Syntax error: Missing semicolon.");
      }
    }
  }

  if (stack.length > 0) {
    throw new Error("Syntax error: Missing closing brace.");
  }

  for (let syntax of correctSyntax) {
    if (tokens.length !== syntax.length) {
      continue;
    }

    let validSyntax = true;
    for (let i = 0; i < syntax.length; i++) {
      if (tokens[i] !== syntax[i]) {
        validSyntax = false;
        break;
      }
    }

    if (validSyntax) {
      return true;
    }
  }

  throw new Error("Syntax error: Invalid token sequence.");
}
