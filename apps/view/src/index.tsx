// @tracespace/view entry point
import React from 'react'
import './styles'

Promise.all([
  import('react-dom'),
  import('./App'),
  import('./state/StoreProvider'),
]).then(imports => {
  const [
    {default: ReactDom},
    {default: App},
    {default: StoreProvider},
  ] = imports

  ReactDom.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    document.querySelector('#app')
  )
})
