import { Children, Fragment, isValidElement } from "react";

function renderContent(content, value) {
  if (typeof content === "function") {
    return content(value);
  }

  return content ?? null;
}

function toItems(each) {
  if (each == null) {
    return [];
  }

  if (Array.isArray(each)) {
    return each;
  }

  if (typeof each[Symbol.iterator] === "function") {
    return Array.from(each);
  }

  return [];
}

function matchesValue(when, value) {
  if (typeof when === "function") {
    return Boolean(when(value));
  }

  if (Array.isArray(when)) {
    return when.some((candidate) => Object.is(candidate, value));
  }

  return Object.is(when, value);
}

function Show({ children, fallback = null, when }) {
  return (
    <Fragment>
      {when ? renderContent(children, when) : renderContent(fallback, when)}
    </Fragment>
  );
}

function Match({ children }) {
  return <Fragment>{children}</Fragment>;
}

function Default({ children }) {
  return <Fragment>{children}</Fragment>;
}

function RenderSwitch({ children, fallback = null, value }) {
  const items = Children.toArray(children);
  let defaultMatch = null;

  for (const item of items) {
    if (!isValidElement(item)) {
      continue;
    }

    if (item.type === Default) {
      defaultMatch = item;
      continue;
    }

    if (item.type !== Match) {
      continue;
    }

    if (matchesValue(item.props.when, value)) {
      return (
        <Fragment>{renderContent(item.props.children, value)}</Fragment>
      );
    }
  }

  if (defaultMatch) {
    return (
      <Fragment>{renderContent(defaultMatch.props.children, value)}</Fragment>
    );
  }

  return <Fragment>{renderContent(fallback, value)}</Fragment>;
}

function For({ children, each, fallback = null }) {
  const items = toItems(each);

  if (!items.length) {
    return <Fragment>{renderContent(fallback, items)}</Fragment>;
  }

  if (typeof children !== "function") {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      {items.map((item, index) => children(item, index))}
    </Fragment>
  );
}

Match.displayName = "Match";
Default.displayName = "Default";
RenderSwitch.displayName = "RenderSwitch";
Show.displayName = "Show";
For.displayName = "For";

export { Default, For, Match, RenderSwitch, Show };
