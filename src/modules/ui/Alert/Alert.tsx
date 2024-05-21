import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertProps{
    tittle:string;
    description:string;
    action:string;
    cancel:string;
    accept:string;
    onAccept:() => void;
}

export default function Alert(props: AlertProps) {
    const { tittle,description,action,cancel,accept,onAccept } = props ;

    const handleOnAccept = () =>{
        onAccept();
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{action}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ tittle }</AlertDialogTitle>
          <AlertDialogDescription>{ description }</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ cancel }</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnAccept}>{ accept }</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
