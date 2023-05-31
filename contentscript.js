var eventHref = {};

function isHrefMalicious(anchor) {
    const pattern = /(@.*)(\.|^)zip$/m;
    const re = new RegExp(pattern);
    const href = anchor.getAttribute("href");

    if (re.test(href)) {
        return [true, href];
    }

    return [false, ""];
}

document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a");

  if (anchor !== null) {
    const [isMalicious, href] = isHrefMalicious(anchor);

    if (isMalicious) {
      event.preventDefault();
      eventHref = href;

      swal({
        title: "Are you sure?",
        text: "This link could be malicious :\n" + decodeURI(anchor.href),
        icon: "warning",
        buttons: [
          "Cancel",
          "Yes"
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {
          window.location.href = eventHref;
        } else {
          swal("Canceled!", "Successfully canceled!", "success");
        }
      });
    }
  }
});
