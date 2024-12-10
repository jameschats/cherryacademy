using System;
using System.Collections.Generic;

namespace ca.api.Entities;

public partial class Tbluser
{
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public bool IsDeleted { get; set; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Token { get; set; }
}
