import { GraphQLResolveInfo } from "graphql";
import fieldsToRelations from "graphql-fields-to-relations";

const pathHandler = (info: GraphQLResolveInfo, nested: boolean): string[] => {
  const relationPaths = fieldsToRelations(info);

  if (!nested) {
    return relationPaths;
  }

  const paths = [];

  for (const i in relationPaths) {
    const path = relationPaths[i].replace("patient", "").substring(1); // TODO - Handle {Errors} removal.
    if (path !== "") {
      paths.push(path);
    }
  }

  return paths;
};

export default pathHandler;
