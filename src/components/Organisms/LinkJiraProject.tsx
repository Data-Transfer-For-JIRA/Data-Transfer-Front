import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

export default function LinkJiraProject() {
  const { state } = useLocation();
  const [mainJiraKey, setMainJiraKey] = useState();
  // const [subJiraKey, setSubJiraKey] = useState();

  useEffect(() => { if (state !== null) { setMainJiraKey(state.jiraPorjectCode) } })
  return (
    <div>{`test = ${mainJiraKey}`}</div>
  )
}
