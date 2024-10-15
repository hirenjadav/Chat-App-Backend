const isLoggerEnabled = true;

const info = (messageName, messageValue = "") => {
  if (!isLoggerEnabled) return;
  console.info(`\n\n\n${messageName}`, messageValue);
};

const warn = (messageName, messageValue = "") => {
  if (!isLoggerEnabled) return;
  console.warn(`\n\n\n${messageName}`, messageValue);
};

const error = (messageName, messageValue = "") => {
  console.error(`${messageName}`, messageValue);
};

const log = (messageName, messageValue = "") => {
  if (!isLoggerEnabled) return;
  console.log(`\n\n\n${messageName}`, messageValue);
};

const logger = {
  log,
  info,
  error,
  warn,
};

module.exports = logger;
