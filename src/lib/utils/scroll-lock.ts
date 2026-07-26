let scrollLockCount = 0;
let previousBodyOverflow = "";
let previousBodyOverscrollBehavior = "";
let previousBodyPaddingRight = "";
let previousBodyBackgroundColor = "";

function isTransparentColor(color: string) {
  return (
    !color ||
    color === "transparent" ||
    color === "rgba(0, 0, 0, 0)" ||
    color === "rgb(0 0 0 / 0)"
  );
}

function getScrollLockBackgroundColor() {
  const candidates = [
    document.body,
    document.getElementById("root"),
    document.getElementById("root")?.firstElementChild,
    document.documentElement,
  ].filter(Boolean);

  for (const element of candidates as Element[]) {
    const backgroundColor = window.getComputedStyle(element).backgroundColor;

    if (!isTransparentColor(backgroundColor)) {
      return backgroundColor;
    }
  }

  return "";
}

export function lockAppScroll() {
  scrollLockCount += 1;

  if (scrollLockCount !== 1) {
    return;
  }

  const body = document.body;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const computedBodyPaddingRight =
    Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

  previousBodyOverflow = body.style.overflow;
  previousBodyOverscrollBehavior = body.style.overscrollBehavior;
  previousBodyPaddingRight = body.style.paddingRight;
  previousBodyBackgroundColor = body.style.backgroundColor;

  body.style.overflow = "hidden";
  body.style.overscrollBehavior = "none";
  body.style.backgroundColor = getScrollLockBackgroundColor();

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${computedBodyPaddingRight + scrollbarWidth}px`;
  }
}

export function unlockAppScroll() {
  if (scrollLockCount === 0) {
    return;
  }

  scrollLockCount -= 1;

  if (scrollLockCount !== 0) {
    return;
  }

  const body = document.body;

  body.style.overflow = previousBodyOverflow;
  body.style.overscrollBehavior = previousBodyOverscrollBehavior;
  body.style.paddingRight = previousBodyPaddingRight;
  body.style.backgroundColor = previousBodyBackgroundColor;
}
