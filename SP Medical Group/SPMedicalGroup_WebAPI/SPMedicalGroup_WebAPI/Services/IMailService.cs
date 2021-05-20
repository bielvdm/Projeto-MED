using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeRequest request, string emaildapessoa);
    }
}
