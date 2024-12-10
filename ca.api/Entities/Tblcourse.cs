using System;
using System.Collections.Generic;

namespace ca.api.Entities;

public partial class Tblcourse
{
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public bool IsDeleted { get; set; }

    public string Name { get; set; } = null!;

    public string? Duration { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Tblstudent> Tblstudents { get; set; } = new List<Tblstudent>();
}
