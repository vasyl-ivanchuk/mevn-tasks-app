(async () => {
    await import("./routes/user.spec.mjs");
    await import("./policies/loginPolicy.spec.mjs");
    run();
})();