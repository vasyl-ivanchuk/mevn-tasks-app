(async () => {
    await import("./routes/user.spec.mjs");
    await import("./policies/loginPolicy.spec.mjs");
    await import("./routes/tasks.spec.mjs");
    await import("./policies/isAuthenticated.spec.mjs");
    await import("./policies/taskItemPolicy.spec.mjs");
    run();
})();