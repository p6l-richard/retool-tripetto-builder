import React, { useRef, useEffect } from "react";
import { Builder } from "tripetto";
import { run } from "tripetto-runner-autoscroll";
import "./styles.scss";
import "tripetto-block-text";
import "tripetto-block-calculator";
import "tripetto-block-checkbox";
import "tripetto-block-checkboxes";
import "tripetto-block-date";
import "tripetto-block-device";
import "tripetto-block-dropdown";
import "tripetto-block-email";
import "tripetto-block-error";
import "tripetto-block-evaluate";
import "tripetto-block-file-upload";
import "tripetto-block-hidden-field";
import "tripetto-block-mailer";
import "tripetto-block-matrix";
import "tripetto-block-multiple-choice";
import "tripetto-block-number";
import "tripetto-block-paragraph";
import "tripetto-block-password";
import "tripetto-block-phone-number";
import "tripetto-block-picture-choice";

const BUILDER_CONFIG = {
  disableLogo: true,
  disableSaveButton: true,
  disableCloseButton: true,
  disableTutorialButton: false,
  controls: "left",
  disableEditButton: true,
  supportURL: false,
  disablePrologue: true,
  zoom: "1:1",
  centering: true,
};
const TripettoBuilder = ({ triggerQuery, model, modelUpdate }) => {
  const builderRef = useRef();
  const builderElementRef = useRef();
  const autoscrollRef = useRef();
  const autoscrollElementRef = useRef();

  useEffect(() => {
    if (!builderRef.current) {
      builderRef.current = Builder.open(model.formDefinition, {
        ...BUILDER_CONFIG,
        element: builderElementRef.current,
        onSave: () => console.log("SAVED!"),
        onReady: (builder) => {
          const onEdit = (type, id) => {
            switch (type) {
              case "prologue":
                builder.edit("prologue");
                break;
              case "epilogue":
                builder.edit("epilogue", id);
                break;
              default:
                if (id) {
                  builder.edit("node", id);
                }
                break;
            }
          };

          // Builder is ready, now create the autoscroll runner for the live preview
          run({
            element: autoscrollElementRef.current,
            definition: builder.definition,
            view: "preview",
            onEdit,
          }).then((runner) => {
            autoscrollRef.current = runner;
          });

          // When the definition is changed, update the preview
          builder.hook("OnChange", "framed", (event) => {
            autoscrollRef.current.definition = event.definition;
            modelUpdate({ formDefinitionOutput: event.definition });
          });

          // When something is edited in the builder, let the preview know
          builder.hook("OnEdit", "synchronous", (event) => {
            autoscrollRef.current.doPreview(event.data);
          });
        },
      });
    }
  }, []);

  return (
    <>
      <div ref={builderElementRef} className="builder"></div>
      <div ref={autoscrollElementRef} className="runner visible"></div>
    </>
  );
};
export default TripettoBuilder;
