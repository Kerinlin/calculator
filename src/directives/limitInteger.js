const limitInteger = {
  mounted(el) {
    const inputHandler = event => {
      const input = event.target;
      const sanitizedValue = input.value.replace(/[^\d]/g, "");
      input.value = sanitizedValue.length > 0 && sanitizedValue[0] !== "0" ? sanitizedValue : "";
    };

    el.addEventListener("input", inputHandler);
  },

  unmounted(el) {
    el.removeEventListener("input", inputHandler);
  },
};

export { limitInteger };
