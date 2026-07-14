function Button(props) {
  var href = props.href;
  var download = props.download;
  var onClick = props.onClick;
  var children = props.children;
  var variant = props.variant || "outline";
  var className = props.className || "";

  var base =
    "btn-space font-orbitron text-xs tracking-widest uppercase transition-colors duration-300 inline-block text-center";

  var styles =
    variant === "filled"
      ? "bg-purple-600/80 hover:bg-purple-600 text-white"
      : "text-purple-300 hover:text-white";

  var classes = base + " " + styles + " " + className;

  var content = <span className="btn-space-inner px-8 py-3">{children}</span>;

  var extraLinkProps = {};
  if (!download) {
    extraLinkProps.target = "_blank";
    extraLinkProps.rel = "noreferrer";
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={classes}
        {...extraLinkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={props.type || "button"} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

export default Button;
