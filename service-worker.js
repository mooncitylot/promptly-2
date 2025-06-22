//@ts-nocheck
import { precacheAndRoute } from 'workbox-precaching'
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('install', () => {
  // @ts-ignore
  console.log('Service Worker installed')
})

self.addEventListener('activate', () => {
  console.log('Service Worker activated')
})
