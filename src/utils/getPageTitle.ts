const title = process.env.VUE_APP_BASE_NAME;

export default function getPageTitle(pageTitle:string | undefined):string {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return title;
}
