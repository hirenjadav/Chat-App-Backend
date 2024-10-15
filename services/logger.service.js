const info = (messageName, messageValue = "") => {
  console.info(`\n\n\n${messageName}`, messageValue);
};

const warn = (messageName, messageValue = "") => {
  console.warn(`\n\n\n${messageName}`, messageValue);
};

const error = (messageName, messageValue = "") => {
  console.error(`${messageName}`, messageValue);
};

const log = (messageName, messageValue = "") => {
  console.log(`\n\n\n${messageName}`, messageValue);
};

const logger = {
  log,
  info,
  error,
  warn,
};

module.exports = logger;