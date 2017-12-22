using System.Security.Principal;

namespace AWC.ActivityPortal.Helpers
{
    internal class UserHelper
    {
        public static string GetCurrentUsername(IPrincipal principal)
        {
            if (principal != null && principal.Identity.Name != null)
            {
                return principal.Identity.Name;
            }
            return string.Empty;
        }
    }

    public class AppSettings
    {
        public string Secret { get; set; }
    }

}
