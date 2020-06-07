const input = /** @type {HTMLInputElement} */ (document.getElementById('searchInput'))
input.addEventListener('input', updatePlaceholderState)

const preLibPlaceholderParent = document.getElementById('wvui-typeahead-search');
const preLibPlaceholder = document.createElement('div')
preLibPlaceholder.className = 'wvui-pre-lib-placeholder'

const size = {
  start: {w: '256px', h: '24px'},
  end: {w: '640px', h: '480px'}
}
const loadingClass = 'wvui-pre-lib-placeholder--loading';

function updatePlaceholderState() {
  if ((document.activeElement !== input || !input.value.trim())) {
    if (preLibPlaceholder.parentNode) {
      preLibPlaceholder.classList.remove(loadingClass)
      preLibPlaceholder.parentNode.removeChild(preLibPlaceholder)
    }
  } else {
    // Set the initial placeholder state.
    preLibPlaceholder.style.width = size.start.w;
    preLibPlaceholder.style.height = size.start.h;
    preLibPlaceholderParent.appendChild(preLibPlaceholder)

    // Force layout so the transition kicks in.
    preLibPlaceholder.scrollTop

    preLibPlaceholder.style.width = size.end.w;
    preLibPlaceholder.style.height = size.end.h;
    preLibPlaceholder.classList.add(loadingClass)
  }
}

document.addEventListener('focusout', updatePlaceholderState)
document.addEventListener('focusin', onFocusInLoadLibrary)

function onFocusInLoadLibrary() {
  // if (the the actual WVUI library, Vue.js, and any other dependencies needed have not been
  //     loaded, request them)
  {
    setTimeout(() => {
      import('/vue.js ').then(() => {
        console.log('loaded')
        // Mount into the wvui-typeahead-search container
        // Unregister and delete the placeholder. It won't be needed again.
      })
    }, Math.random() * 5000)

    updatePlaceholderState()
  }
  // else this function is unregistered and the WVUI Vue.js library is in control.
}

updatePlaceholderState()