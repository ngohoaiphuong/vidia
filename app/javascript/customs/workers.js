import Worker from '../shared/workers/app.worker.js'

function registerWorkers() {
  let w = new Worker()
  w.postMessage({type: 'connected'})
  w.onmessage = (event) => {
    console.log('-----------------registerWorkers-------------------')
    console.log(event.data)
    console.log('-----------------registerWorkers-------------------')
    w.terminate()
  }
}

export {
  registerWorkers
}