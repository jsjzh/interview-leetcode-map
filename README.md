# interview-leetcode-map

## 介绍

项目只有 dev 环境，为求快速启动（本人公司电脑实在是狗屎，都 9102 年了，不上固态的开发机真不多见），webpack 配置为手工配置的最简，在渣渣机子上还是挺快的。

另外，项目里默认对 js 做了 babel 处理；对 css 做了自动增加前缀处理，本来打算加 sass 的，但是发现 node-sass 的源下载的很慢，遂放弃了，这个项目也不会很多复杂的样式，所以还是写写普通的好了，在 types/html-code 下就是专门用来写 css 样式的。

## parcel

会自动安装所需依赖

alias 配置的时候不能用 ~ 和 @

~ used by Parcel to resolve tilde paths.

@ used by npm to resolve npm organisations.
