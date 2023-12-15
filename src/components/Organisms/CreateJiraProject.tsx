import './CreateJiraProject.css'
type Type = {
  code: string;
}
export default function CreateJiraProject({ code }: Type) {
  return (
    <div style={{ color: "white" }}>This is Create JiraProject Contents {code}</div>
  )
}
