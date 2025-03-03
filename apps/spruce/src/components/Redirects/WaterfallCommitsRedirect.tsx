import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { FullPageLoad } from "@evg-ui/lib/components/FullPageLoad";
import { CURRENT_PROJECT } from "constants/cookies";
import { getCommitsRoute, getWaterfallRoute } from "constants/routes";
import {
  SpruceConfigQuery,
  SpruceConfigQueryVariables,
} from "gql/generated/types";
import { SPRUCE_CONFIG } from "gql/queries";
import { useMergedBetaFeatures } from "hooks";

export const WaterfallCommitsRedirect: React.FC = () => {
  const recentlySelectedProject = Cookies.get(CURRENT_PROJECT);
  const { data: spruceData } = useQuery<
    SpruceConfigQuery,
    SpruceConfigQueryVariables
  >(SPRUCE_CONFIG, {
    skip: !!recentlySelectedProject,
  });

  const { betaFeatures } = useMergedBetaFeatures();
  const { spruceWaterfallEnabled } = betaFeatures ?? {};
  const currProject =
    recentlySelectedProject ?? spruceData?.spruceConfig?.ui?.defaultProject;

  if (!betaFeatures) {
    return <FullPageLoad />;
  }

  return (
    <Navigate
      to={
        spruceWaterfallEnabled
          ? getWaterfallRoute(currProject)
          : getCommitsRoute(currProject)
      }
    />
  );
};
