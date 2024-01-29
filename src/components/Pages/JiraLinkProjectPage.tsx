import ModalContentsProvider from '../Context/ModalContentsProvider';
import LinkJiraProject from '../Organisms/LinkJiraProject';

export default function JiraLinkProjectPage() {
  return (
    <ModalContentsProvider>
      <LinkJiraProject />
    </ModalContentsProvider>
  )
}
