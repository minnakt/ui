import { Navigate, useParams } from "react-router-dom";
import { FullPageLoad } from "@evg-ui/lib/components/FullPageLoad";
import { getCommitsRoute, getWaterfallRoute, slugs } from "constants/routes";
import { useMergedBetaFeatures } from "hooks";

export const LegacyWaterfallRedirect: React.FC = () => {
  const { [slugs.projectIdentifier]: projectIdentifier } = useParams();

  const { betaFeatures } = useMergedBetaFeatures();
  const { spruceWaterfallEnabled } = betaFeatures ?? {};

  if (!betaFeatures) {
    return <FullPageLoad />;
  }

  return (
    <Navigate
      to={
        spruceWaterfallEnabled
          ? getWaterfallRoute(projectIdentifier)
          : getCommitsRoute(projectIdentifier)
      }
    />
  );
};
