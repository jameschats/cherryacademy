using System;
using System.Collections.Generic;

namespace ca.api.Entities;

public partial class Tblstudent
{
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public bool IsDeleted { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? MobileNo { get; set; }

    public int? CourseId { get; set; }

    public virtual Tblcourse? Course { get; set; }
}
