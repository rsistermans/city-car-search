module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'crlf',
  importOrder: [
    // Place react import at the top
    '^@angular$',
    'rxjs',
    // External dependencies
    '^\\w',
    // This project's own aliases
    '^(@@components|@typings|@services)(/.*|$)',
    // Every import starting with ./ or ~/
    '^[./|~/]',
  ],
  importOrderSeparation: true,
};
