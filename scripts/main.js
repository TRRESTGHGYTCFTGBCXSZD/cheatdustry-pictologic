const ui = require("ui-lib/library");

const core = require("trrestghgytcftgbcxszdcheatdustrypictologic/core");

var ptl;

ui.addMenuButton("PicToLogic (Cheatdustry Processors)", "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button("PicToLogic (Cheatdustry Processors)", Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog("PicToLogic (Cheatdustry Processors)");

	ptl.cont.add("[coral]1.[] Select a PNG image.");
	ptl.cont.row();
	ptl.cont.add("[coral]2.[] Click [stat]Export[] to create a schematic.");
	ptl.cont.row();
	ptl.cont.add("[coral]Please dont use this for furry/weeb shit thank you");
	ptl.cont.row();

	ptl.cont.button("Select Image", () => {
		readBinFile("Schematic's source image", "png", bytes => {
			try {
				core.image = new Pixmap(bytes);
			} catch (e) {
				ui.showError("Failed to load source image", e);
			}
		});
	}).size(240, 50);
	ptl.cont.row();

	ptl.cont.label(() => core.stage).center();

	ptl.addCloseButton();
	ptl.buttons.button("$settings", Icon.settings, () => {
		core.settings.show();
	});
	ptl.buttons.button("Export", Icon.export, () => {
		new java.lang.Thread(() => {
			try {
				core.export(core.image);
				ptl.hide();
			} catch (e) {
				Core.app.post(() => {
					ui.showError("Failed to export schematic", e);
					core.stage = "";
				});
			}
		}, "PicToLogic worker").start();
	}).disabled(() => !core.image || core.stage != "");

	core.build();
});
