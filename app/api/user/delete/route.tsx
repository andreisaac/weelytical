'use server'
import {createClient} from "@utils/supabase/server";

export async function DELETE(req: Request) {
    const d = await req.json();
    const {userId, trusted} = d;
    if(userId && trusted) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.admin.deleteUser(userId);
    }
    return Response.json({msg: "success"})
  }

