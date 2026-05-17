It's a Sunday afternoon, and I just spent the last few hours teaching this blog to draw a picture of itself.

You can check out the graph from the [Architecture](/jetskii-blogs/architecture) tab.

## Why

I've been writing here for a while now. The code got complex, since huge parts of it were written by AI. I'd been wanting to actually see what the code architecture looks like now that we have password protected blogs and all.

I used tree-sitter and Typescript language server to create a visualisation of how the repo looks.

The tool itself is its own thing, present at [github.com/divijsingla/codearchview](https://github.com/divijsingla/codearchview).

## Codearchview

tree-sitter does the parsing (imports, declarations, JSX, function calls), and the language server resolves what each reference actually points to.

Starts at src/main.tsx, walks depth-first, stops at anything outside the repo (react, @radix-ui/*, Google Analytics, etc.). Output is a JSON (files + symbols) and edges (imports / calls / renders / uses-type).

It runs as a prebuild step here, so the graph stays roughly in sync with the code (there might be bugs, you can help find them if you dive into the repo or let your coding agent do it). Build doesn't break if Python isn't around. It just reuses the last graph.
