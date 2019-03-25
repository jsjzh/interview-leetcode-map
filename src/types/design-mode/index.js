import { ProxySingleton } from './Singleton'
import { strategy } from './Strategy'
import { Agency } from './Agency'

console.log(new ProxySingleton('foo') === new ProxySingleton('bar'))
console.log(strategy('add', 1)), console.log(strategy('minus', 1))
Agency.setSrc('http://lensbuyersguide.com/gallery/219/2/23_iso100_14mm.jpg')
