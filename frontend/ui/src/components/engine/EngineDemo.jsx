import { useState } from 'react'
import useStockfish from '@/hooks/useStockfish'

export default function EngineDemo() {
  const [output, setOutput] = useState('')

  const { send } = useStockfish((msg) => {
    setOutput((prev) => prev + '\\n' + msg)
  })

  return (
    <div>
      <button onClick={() => send('uci')}>Send UCI</button>
      <pre>{output}</pre>
    </div>
  )
}
