const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized. No role found" });
    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      return res.status(401).json({
        success: false,
        error: "Not authorized to view this resource",
      });

    next();
  };
};

module.exports = verifyRoles;
