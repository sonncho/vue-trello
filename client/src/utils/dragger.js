import dragula from 'dragula'
import 'dragula/dist/dragula.css'

const dragger = {
  init(container) {
    return dragula([...container])
  },

  silblings({ el, wrapper, candidates, type }) { //전객체와 다음객체를 반환
    const curId = el.dataset[type + 'Id'] * 1

    let prev = null
    let next = null

    candidates.forEach((el, idx, arr) => {
    
      const id = el.dataset[type + 'Id'] * 1
      if(id === curId) {
        prev = idx > 0 ? {
          id: arr[idx-1].dataset[type + 'Id'] * 1,
          pos: arr[idx-1].dataset[type + 'Pos'] * 1
        } : null
        next = idx < arr.length -1 ? {
          id: arr[idx + 1].dataset[type + 'Id'] * 1,
          pos: arr[idx + 1].dataset[type + 'Pos'] * 1
        } : null
      }
    })

    return { prev, next }
  }
}

export default dragger