import { ProxySingleton } from './Singleton'
import { strategy } from './Strategy'
import { setImg, setImgAgency } from './Agency'

console.log(new ProxySingleton('foo') === new ProxySingleton('bar'))
console.log(strategy('add', 1)), console.log(strategy('minus', 1))
setImgAgency.setSrc(document.getElementById('agencyImg'), 'http://lensbuyersguide.com/gallery/219/2/23_iso100_14mm.jpg')
