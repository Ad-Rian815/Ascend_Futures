LOGO
====
The nav and footer reference the foundation's real logo. To make it load
reliably everywhere (offline, any host, no hotlink-blocking), save the logo
file here and point the markup at it:

1. Download the logo from the live site:
   https://ascendfuturesfoundation.org/wp-content/uploads/2024/09/cropped-Logo-Small-1.png
   Save it in this folder as:  aff-logo.png

2. In every page, the logo <img> currently uses the full URL above. To use the
   local copy instead, find/replace that URL with:  assets/images/aff-logo.png
   (VS Code: Ctrl+Shift+H, replace across all files.)

Until then the markup falls back to the "AscendFutures" wordmark automatically
if the hotlinked image doesn't load.
