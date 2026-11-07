#!/bin/sh
# Regenerates resume.pdf from resume.html.
# The phone number is kept out of the public HTML: it is read from the
# git-ignored .resume-phone file and added to a temporary copy for printing only.
set -eu
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp "$PWD/resume.print.XXXXXX.html")"
trap 'rm -f "$TMP"' EXIT HUP INT TERM
PHONE=""
[ -f .resume-phone ] && PHONE="$(head -n1 .resume-phone)"
if [ -n "$PHONE" ]; then
  sed "s|<!--PHONE-->|<span>$PHONE</span>|" resume.html > "$TMP"
else
  echo "note: .resume-phone not found; the PDF will have no phone number" >&2
  cp resume.html "$TMP"
fi
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf-no-header \
  --print-to-pdf="$PWD/resume.pdf" "file://$PWD/$TMP" 2>/dev/null
rm -f "$TMP"
echo "wrote resume.pdf"
