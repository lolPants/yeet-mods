import execa from 'execa'
import { join } from 'path'
import { exists, remove, rmDir } from './fs'
import { answerRenderer } from './ipc/betterIPC'
import { resolveInstallInfo } from './path/resolve'

answerRenderer<void, YeetType>('yeet-mods', async type => {
  const installInfo = await resolveInstallInfo()
  if (installInfo.valid === false || installInfo.path === null) return

  await yeetMods(installInfo.path)
  if (type === 'mega') await megaYeet(installInfo.path)
  if (type === 'giga') await gigaYeet(installInfo.path)
})

const yeetMods = async (path: string) => {
  const pluginsDir = join(path, 'Plugins')
  await rmDir(pluginsDir)
}

type YeetType = 'classic' | 'mega' | 'giga'

const megaYeet = async (path: string) => {
  const bsPath = join(path, 'Beat Saber.exe')
  const ipaPath = join(path, 'IPA.exe')

  const bsExists = await exists(bsPath)
  if (!bsExists) return

  const ipaExists = await exists(ipaPath)
  if (!ipaExists) return

  try {
    await execa(ipaPath, ['--revert', '--nowait', bsPath])
  } catch (err) {
    // lmao
  }

  await remove(ipaPath)
  await rmDir(join(path, 'IPA'))
  await rmDir(join(path, 'Libs'))
  await rmDir(join(path, 'Logs'))
  await remove(join(path, 'IPA.exe.config'))
  await remove(join(path, 'winhttp.dll'))
}

const gigaYeet = async (path: string) => {
  console.log('giga', path)
}
